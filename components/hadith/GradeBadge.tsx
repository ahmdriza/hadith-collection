import { getGradeColor } from '@/lib/utils';

interface GradeBadgeProps {
    grade: 'Sahih' | 'Hasan' | 'Daif' | 'Mixed';
}

export default function GradeBadge({ grade }: GradeBadgeProps) {
    return (
        <span
            className={`text-xs px-2.5 py-0.5 rounded-full border font-medium ${getGradeColor(grade)}`}
        >
            {grade}
        </span>
    );
}
