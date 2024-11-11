
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

type StudentTeamsProps = {
  studentName: string[];
}

export default function StudentTeams({ studentName }: StudentTeamsProps) {


  return (
    <List dense disablePadding sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {studentName.length === 0 ? (
        <ListItem>
          <ListItemText primary='No students available.'/>
        </ListItem>
        ) : (
        studentName.map((name, index) => {
          const labelId = `checkbox-list-secondary-label-${name}`;
          return (
            <ListItem
            disablePadding
            key={index}
            sx={{ paddingTop: 1}}
            >
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar
                    alt={`Avatar n°${index}`}
                    src={`/static/images/avatar/${index}.jpg`}
                  />
                </ListItemAvatar>
                <ListItemText id={labelId} primary={`${name}`} />
              </ListItemButton>
            </ListItem>
          );
        })
      )}
    </List>
  );
}
