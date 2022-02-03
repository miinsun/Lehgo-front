// import axios from 'axios'
import courseStore from '../store/modules/courseStore.js';

class courseService{
   notCoursePlaceList(placeList){
        let coursePlaceList = courseStore.state.placeList;
        let newPlaceList = []
        for (let p in placeList){
            let noCourse = false;
            for (let cp in coursePlaceList){
                if(placeList[p].PLACE_ID == coursePlaceList[cp].PLACE_ID){
                    noCourse = true;
                    break;
                }
            }
            if (!noCourse){
                newPlaceList.push(placeList[p])
            }
        }
        return newPlaceList
   }
}

export default new courseService()
