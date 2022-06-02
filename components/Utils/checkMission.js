import { completeDailyMission, completeMonthMission } from '../../data/localmission';
export function checkMission(ID, des) {
    if (ID == 0 && des == "Ăn trưa")
    {
        completeDailyMission(1)
    }
    else if (ID == 0 && des == "Ăn tối")
    {
        completeDailyMission(2)
    }
    else if (ID == 5 && des == "Lương")
    {
        completeMonthMission(1)
    }
    else
    {
        completeDailyMission(0)
    }
}