import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';


interface StudentInstructorToggleProps {
    onChange: (type: 'student' | 'instructor') => void;
    userType: 'student' | 'instructor';
}

export default function StudentInstructorToggle({ onChange, userType }: StudentInstructorToggleProps) {
    const handleAlignment = (
        event: React.MouseEvent<HTMLElement>,
        newType: 'student' | 'instructor' | null
    ) => {
        if (newType !== null) {
            onChange(newType);
        }
    };

    return (
        <>
            <ToggleButtonGroup
                value={userType}
                exclusive
                onChange={handleAlignment}
                aria-label="User type selection"
            >
                <ToggleButton value="student" aria-label="Student" disableRipple={true}>
                    Student
                </ToggleButton>
                <ToggleButton value="instructor" aria-label="Instructor" disableRipple={true}>
                    Instructor
                </ToggleButton>
            </ToggleButtonGroup>
            <input type="hidden" name="userType" value={userType} />

        </>
    );
}
