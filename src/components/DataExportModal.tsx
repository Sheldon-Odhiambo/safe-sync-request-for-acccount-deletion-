import React, { useState } from 'react';
import { X, Download, FileJson, CheckCircle2 } from 'lucide-react';

interface DataExportModalProps {
  email: string;
  isOpen: boolean;
  onClose: () => void;
}

export const DataExportModal: React.FC<DataExportModalProps> = ({ email, isOpen, onClose }) => {
  const [downloaded, setDownloaded] = useState(false);

  if (!isOpen) return null;

  const handleExportJson = () => {
    const exportData = {
      exportMetadata: {
        system: "SafeSync Emergency Telemetry Platform",
        userAccount: email || "oumashelly004@gmail.com",
        exportTimestamp: new Date().toISOString(),
        gdprComplianceArticle: "Article 20 - Right to Data Portability",
        retentionPolicy: "Standard 30-Day Purge Queue",
      },
      profile: {
        fullName: "Shelly Ouma",
        emergencyContactGroup: "Primary Tier 1 Family Network",
        bloodGroup: "O-Positive",
        medicalAlertNotes: "Penicillin allergy, Mild asthma (inhaler on person)",
        primaryHospitalPreference: "St. Jude Emergency Center",
      },
      registeredHardwareSensors: [
        {
          deviceId: "SS-HUB-4091",
          deviceType: "SafeSync Base Station Gen 3",
          status: "Connected",
          lastHeartbeat: new Date().toISOString(),
          firmware: "v4.2.1-lts",
        },
        {
          deviceId: "SS-CAR-8820",
          deviceType: "OBD-II Telematics Crash Sensor",
          vehicleAssigned: "Subaru Outback 2023",
          airbagTriggerThreshold: "Nominal",
        },
        {
          deviceId: "SS-BAND-9102",
          deviceType: "Wearable Fall & Vitals Alert Pager",
          batteryLevel: "88%",
        },
      ],
      emergencyContacts: [
        { name: "David Ouma", relationship: "Spouse", phone: "+1 (555) 234-5678", notifyPriority: 1 },
        { name: "Dr. Elena Vance", relationship: "Primary Physician", phone: "+1 (555) 876-5432", notifyPriority: 2 },
      ],
      recentIncidentLogs: [
        {
          incidentId: "INC-991204",
          timestamp: "2026-08-14T14:22:10Z",
          type: "Fall Alert - Rapid Deceleration Detected",
          dispatchStatus: "Resolved by User PIN (False Alarm within 20s)",
        },
        {
          incidentId: "INC-810239",
          timestamp: "2026-03-02T09:11:45Z",
          type: "Wearable Manual SOS Button Press",
          dispatchStatus: "Assistance Rendered - Paramedic Sync Transmitted",
        },
      ],
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `SafeSync_Data_Archive_${(email || 'account').split('@')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-blue-50 text-[#002B66] border border-blue-200">
            <FileJson className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Export SafeSync Data Archive
            </h3>
            <p className="text-xs text-slate-500">
              Download your complete records before account deletion
            </p>
          </div>
        </div>

        <div className="text-xs text-slate-600 space-y-2.5 mb-5 bg-slate-50 p-4 rounded-xl border border-slate-200 leading-relaxed">
          <p>
            In accordance with GDPR Article 20, you have the right to receive all personal data, telemetry records, and sensor logs associated with your SafeSync account in a machine-readable format.
          </p>
          <p className="font-medium text-slate-900">
            Included in your export package:
          </p>
          <ul className="list-disc pl-4 space-y-1 text-slate-700">
            <li>Medical profile notes (allergies, directives, blood group)</li>
            <li>Emergency contact phone routing logs</li>
            <li>Hardware sensor pairing IDs & telemetry history</li>
            <li>Historical SOS dispatch and false-alarm clearance receipts</li>
          </ul>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleExportJson}
            className="px-4 py-2 text-xs font-bold text-white bg-[#002B66] hover:bg-[#001f4d] rounded-lg transition-colors flex items-center gap-2 shadow-2xs"
          >
            {downloaded ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Archive Downloaded</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Download Archive (.JSON)</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
