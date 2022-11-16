import {useAppStore} from "../store/store";
import {createShellBox} from "./createShellBox";

export const findHouseByProp = (prop: string , value: string, state: boolean)=>{
    const housesData = useAppStore.getState().housesData
    const scene = useAppStore.getState().scene
   for(let i = 0; i < housesData.length; i++) {
       // @ts-ignore TODO correct after successful tests
       if(housesData[i][prop].includes(value)){
           if (housesData[i]){
               // @ts-ignore TODO correct after successful tests
               const houseType = housesData[i]['Model'].substring(0,1);
               // @ts-ignore TODO correct after successful tests
               const houseNumber = housesData[i]['LandNumber'];
               const houseMesh = scene.getMeshByName(`Type_${houseType}_${houseNumber}`)
               if (state){
                   createShellBox(houseMesh);
               }else {
                   const shell = scene.getMeshByName("shell_box" + houseMesh?.id);
                   shell?.dispose();
               }
           }
       }
   }
}