import { useState, useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import StudentTeams from './TeamsStudents';


interface Team {
  teamName: string;
  students: string[];
}

export default function TeamsDrop (){

  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch('/api/instructor_teamsView');
        const data = await response.json();
        setTeams(data);
      } 
      catch (error) {
        console.error('Couldn\'t get teams: ', error);
      }
      finally {
        setLoading(false);
      }
    }
    fetchTeams();
  }, []);

  if (loading) {
    return <p>Loading teams...</p>
  }

  return (
    <div>
      {teams.map((team, index) => (
        <Accordion defaultExpanded elevation={16} key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{color:'white'}}color={'inherit'}/>}
            aria-controls={`panel${index + 1}-content`}
            id={`panel${index + 1}-header`}
            sx={
              {
                bgcolor: '#800020',
                color: 'white',
                fontFamily:'Arial',
              }
            }
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
