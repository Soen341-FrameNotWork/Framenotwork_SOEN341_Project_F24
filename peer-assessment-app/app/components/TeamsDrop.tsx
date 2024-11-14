import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import StudentTeams from './TeamsStudents';

interface Team {
  teamName: string;
  students: string[];
}

interface TeamsDropProps {
  teams: Team[];
  loading: boolean;
}

export default function TeamsDrop({ teams, loading }: TeamsDropProps) {

  if (loading) {
    return <p>Loading teams...</p>;
  }

  return (
    <div>
      {teams.map((team, index) => (
        <Accordion defaultExpanded elevation={16} key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{color:'white'}} color={'inherit'}/>}
            aria-controls={`panel${index + 1}-content`}
            id={`panel${index + 1}-header`}
            sx={{
              bgcolor: '#800020',
              color: 'white',
              fontFamily:'Arial',
            }}
          >
            {team?.teamName}
          </AccordionSummary>
          <AccordionDetails>
            <StudentTeams studentName={team.students}/>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}