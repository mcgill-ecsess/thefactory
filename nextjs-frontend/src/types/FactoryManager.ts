
export type Attributes = {
    First_Name: string;
    Modified_First_Name?: string;
    Last_Name: string;
    McGill_Email: string;
    Office_Hour_Day: string;
    Office_Hour_Day_2: string;
    Role: string;
    End_Time: Date; 
    Start_Time: Date;
    End_Time_2: Date; 
    Start_Time_2: Date;
    Year_Major:string;
    picture : {
        data: {
            attributes:{
                url:string;
            }
        }
    }
    Skills: managerSkill[];
}

type managerSkill = {
    skill: string;
}


export type FactoryManager = {
   
id: number;
attributes: Attributes;


    
}