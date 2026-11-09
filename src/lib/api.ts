const API_BASE = ((import.meta.env.VITE_API_BASE_URL as string | undefined) ?? '').replace(/\/+$/, '');

export const isApiConfigured = API_BASE.length > 0;

export interface DeletionStatus {
  status: 'none' | 'pending';
  requested_at: string | null;
  scheduled_for: string | null;
}

export class ApiError extends Error {
  status: number;
  code: string;
  blockers: unknown[];

  constructor(status: number, code: string, message: string, blockers: unknown[] = []) {
    super(message);
    this.status = status;
    this.code = code;
    this.blockers = blockers;
  }
}

async function request<T>(method: 'GET' | 'POST' | 'DELETE', accessToken: string, body?: unknown): Promise<T> {
  if (!isApiConfigured) {
    throw new ApiError(0, 'not_configured', 'The deletion service is not configured.');
  }

  let res: Response;
  try {
    res = await fetch(`${API_BASE}/deletion`, {
      method,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiError(0, 'network', 'Could not reach SafeSync. Check your connection and try again.');
  }

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    // Our handlers return {detail: {code, message, blockers?}}; auth/validation
    // errors may return {detail: "text"} or a list.
    const detail = data?.detail;
    if (detail && typeof detail === 'object' && !Array.isArray(detail)) {
      throw new ApiError(res.status, detail.code ?? 'error', detail.message ?? 'Request failed', detail.blockers ?? []);
    }
    throw new ApiError(res.status, 'error', typeof detail === 'string' ? detail : 'Request failed');
  }

  return data as T;
}

export const getDeletionStatus = (accessToken: string) =>
  request<DeletionStatus>('GET', accessToken);

export const requestDeletion = (accessToken: string, reason: string | null) =>
  request<DeletionStatus>('POST', accessToken, { confirm: 'DELETE', reason, source: 'web' });

export const cancelDeletion = (accessToken: string) =>
  request<DeletionStatus>('DELETE', accessToken);