export interface WorkshopDT {
    id: number;
    attributes: {
        WorkshopTitle: string;
        Details: string;
        Location: string;
        Date: string;
        StartTime: string;
        EndTime: string;
        signupLink?: string;
        workshopSlides? :string;
        CoverPicture: {
          data:CoverPictureData[];
        }
  }
      }
      


type CoverPictureData = {
    attributes: {
        url:string;
      }
    id: number;
}