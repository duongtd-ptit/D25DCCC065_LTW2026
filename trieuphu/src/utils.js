import { PRIZES, MILESTONES } from './data';
export const calcPrize = (correctCount, reason) => {
    if (reason === 'Bạn đã dừng cuộc chơi') return correctCount > 0 ? PRIZES[correctCount - 1] : 0;
    if (correctCount === 15) return PRIZES[14];
    const passedMilestones = MILESTONES.filter(m => m <= correctCount);
    if (passedMilestones.length === 0) return 0;
    return PRIZES[passedMilestones[passedMilestones.length - 1] - 1];
};