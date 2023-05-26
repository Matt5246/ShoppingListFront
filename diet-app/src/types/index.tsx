import { useAuth } from "../contexts/AuthContext";
const currentUser = useAuth().currentUser;

export interface Setting {
  name: string | typeof currentUser;
  action?: () => void;
  key?: string;
}

export type SettingsList = Setting[];

export interface SignupData {
  phone: string;
}

export interface FormData {
  email?: string;
  password?: string;
}

export interface SignupSummaryProps {
  data: {
    email?: string;
    phone?: string;
  };
  show: boolean;
  handleClose: () => void;
  handleConfirm: (data: { email?: string; phone?: string }) => void;
  error?: string;
}
export interface SubsObject {
  id: string;
  learned: boolean;
  hard: boolean;
  time: string;
  line: string;
}
export interface UpdateSubsObjectPayload {
  selectedSubtitlesId: string;
  id: string;
  learned?: boolean;
  hard?: boolean;
  line?: string;
}
