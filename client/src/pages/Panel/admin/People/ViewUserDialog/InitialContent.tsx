import { AccessTime, Email, ManageAccounts, Person } from '@mui/icons-material';
import {
  DialogContent,
  Grid,
  Paper,
  Stack,
  Tooltip,
  Typography
} from '@mui/material';

type InitialContentProps = {
  skills: string[];
  name: string;
  email: string;
  language: string[];
  createdAt: string;
  role: string;
};

const InitialContent = ({
  createdAt,
  email,
  language,
  name,
  role,
  skills
}: InitialContentProps) => {
  return (
    <DialogContent>
      <Typography sx={{ fontSize: '1rem', fontWeight: 700, py: 2 }}>
        Basic Info
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Stack direction='row' spacing={1} alignItems='center'>
            <Tooltip title='User name'>
              <Person />
            </Tooltip>
            <Typography sx={{ textTransform: 'capitalize' }}>{name}</Typography>
          </Stack>
          <Stack direction='row' marginTop={1} spacing={1} alignItems='center'>
            <Tooltip title='Creation date'>
              <AccessTime />
            </Tooltip>
            <Typography>
              {new Date(createdAt).toLocaleString('en-UK', {
                dateStyle: 'medium'
              })}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack direction='row' spacing={1} alignItems='center'>
            <Tooltip title='User email'>
              <Email />
            </Tooltip>
            <Typography>{email}</Typography>
          </Stack>
          <Stack direction='row' marginTop={1} spacing={1} alignItems='center'>
            <Tooltip title='User role'>
              <ManageAccounts />
            </Tooltip>
            <Typography>{role}</Typography>
          </Stack>
        </Grid>
      </Grid>
      <Typography sx={{ fontSize: '1rem', fontWeight: 700, py: 2 }}>
        Skills
      </Typography>

      {skills?.length ? (
        <Stack direction='row' alignItems='center' flexWrap='wrap' gap={1}>
          {skills.map((skill) => {
            return <Paper sx={{ py: 0.5, px: 1 }}>{skill}</Paper>;
          })}
        </Stack>
      ) : (
        <Typography>No Skill Provided</Typography>
      )}
      <Typography sx={{ fontSize: '1rem', fontWeight: 700, py: 2 }}>
        Languages
      </Typography>
      {language?.length ? (
        <Stack direction='row' alignItems='center' flexWrap='wrap' gap={1}>
          {language.map((lang) => {
            return <Paper sx={{ py: 0.5, px: 1 }}>{lang}</Paper>;
          })}
        </Stack>
      ) : (
        <Typography>No language Provided</Typography>
      )}
    </DialogContent>
  );
};

export default InitialContent;
