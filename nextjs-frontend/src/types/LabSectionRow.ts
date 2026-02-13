
export type LabSectionRow = {
    Image: {
      data: {
        attributes:{
          url:string;
        }
      }
    };
    Description: DescriptionChild[] | null; //THIS WILL ALWAYS JUST BE SIZE 1, so ALWAYS DO Description[0] !!
  }

 
  type DescriptionChild = { 
    format: string;             // Format of the list, e.g., "unordered"
    type: string;               // Type of the list, e.g., "list"
    children: FirstChild[];   // Array of list item children --> These are the bullet points 
  }
  
  type FirstChild = {
    children: SecondChild[];  // Recursively defined for nested children
    type: string;               // The type of the list item, e.g., "list-item"
  }

  type SecondChild = { //This is where the actual text is stored for that bullet point
    text: string;
  }
  
 