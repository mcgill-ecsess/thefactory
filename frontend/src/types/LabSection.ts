import { LabSectionRow } from "./LabSectionRow";

export type LabSection = {
  attributes: {
    SectionTitle:string;
    LabSectionRows: LabSectionRow[];
  }
  id:string;

}

