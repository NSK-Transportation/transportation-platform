import { DownloadIcon, ErrorIcon, SuccessIcon } from "@/shared/assets";
import { Status } from "@/shared/types";

export function getStatusIcon(status: Status) {
  switch (status) {
    case "error":
      return <ErrorIcon />;
    case "success":
      return <SuccessIcon />;
    case "loading":
      return <DownloadIcon />;
    case "idle":
      return null;
  }
}
