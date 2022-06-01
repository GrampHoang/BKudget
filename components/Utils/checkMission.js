import { completeDailyMission } from '../../data/localmission';
export function checkMission(ID, des) {
    if (ID == 0 && des == "Ăn trưa")
    {
        completeDailyMission(1)
    }
    else if (ID == 0 && des == "Ăn tối")
    {
        completeDailyMission(2)
    }
}