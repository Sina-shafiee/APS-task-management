import {
  AccessTime,
  Close,
  Email,
  GitHub,
  LinkedIn,
  ManageAccounts,
  Person
} from '@mui/icons-material';
import {
  Button,
  DialogActions,
  DialogContent,
  Grid,
  Paper,
  Stack,
  Tooltip,
  Typography
} from '@mui/material';
import { InitialContentProps } from './index.types';

export const InitialContent = ({
  createdAt,
  email,
  language,
  name,
  role,
  skills,
  closeModal,
  setEditing,
  social
}: InitialContentProps) => {
  return (
    <>
      <DialogContent
        sx={{
          '::-webkit-scrollbar': {
            width: '5px'
          },

          '::-webkit-scrollbar-track': {
            background: '#f1f1f1'
          },

          '::-webkit-scrollbar-thumb ': {
            background: ' #888'
          },
          '::-webkit-scrollbar-thumb:hover': {
            background: '#555'
          }
        }}
      >
        <Typography sx={{ fontSize: '1rem', fontWeight: 700, py: 2 }}>
          Basic Info
        </Typography>
        <Grid container spacing={{ xs: 1, sm: 2 }}>
          <Grid item xs={12} sm={6}>
            <Stack
              direction='row'
              spacing={1}
              marginTop={1}
              alignItems='center'
            >
              <Tooltip title='User name'>
                <Person />
              </Tooltip>
              <Typography
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: '1',
                  WebkitBoxOrient: 'vertical',
                  color: 'text.primary',
                  textDecoration: 'none',
                  textTransform: 'capitalize'
                }}
              >
                {name}
              </Typography>
            </Stack>
            <Stack
              direction='row'
              marginTop={1}
              spacing={1}
              alignItems='center'
            >
              <Tooltip title='Creation time'>
                <AccessTime />
              </Tooltip>
              <Typography>
                {new Date(createdAt).toLocaleString('en-UK', {
                  dateStyle: 'medium'
                })}
              </Typography>
            </Stack>
            <Stack
              direction='row'
              marginTop={1}
              spacing={1}
              alignItems='center'
            >
              <Tooltip title='User email'>
                <Email />
              </Tooltip>
              <Typography
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: '1',
                  WebkitBoxOrient: 'vertical',
                  color: 'text.primary',
                  textDecoration: 'none'
                }}
                component='a'
                href={`mailto:${email}`}
              >
                {email}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Stack
              direction='row'
              marginTop={1}
              spacing={1}
              alignItems='center'
            >
              <Tooltip title='User role'>
                <ManageAccounts />
              </Tooltip>
              <Typography>{role}</Typography>
            </Stack>
            <Stack
              direction='row'
              marginTop={1}
              spacing={1}
              alignItems='center'
            >
              <Tooltip title='linkedin address'>
                <LinkedIn />
              </Tooltip>
              {social?.linkedin ? (
                <Typography
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: '1',
                    WebkitBoxOrient: 'vertical',
                    color: 'text.primary',
                    textDecoration: 'none'
                  }}
                  component='a'
                  href={social.linkedin}
                >
                  {social?.linkedin}
                </Typography>
              ) : (
                <Typography>Not provided</Typography>
              )}
            </Stack>
            <Stack
              direction='row'
              marginTop={1}
              spacing={1}
              alignItems='center'
            >
              <Tooltip title='github address'>
                <GitHub />
              </Tooltip>
              {social?.github ? (
                <Typography
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: '1',
                    WebkitBoxOrient: 'vertical',
                    color: 'text.primary',
                    textDecoration: 'none'
                  }}
                  component='a'
                  href={social?.github}
                >
                  {social?.github}
                </Typography>
              ) : (
                <Typography>Not provided</Typography>
              )}
            </Stack>
          </Grid>
        </Grid>
        <Typography sx={{ fontSize: '1rem', fontWeight: 700, py: 2 }}>
          Skills
        </Typography>

        {skills?.length ? (
          <Stack direction='row' alignItems='center' flexWrap='wrap' gap={1}>
            {skills.map((skill) => {
              return (
                <Paper key={skill} sx={{ py: 0.5, px: 1 }}>
                  {skill}
                </Paper>
              );
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
              return (
                <Paper key={lang} sx={{ py: 0.5, px: 1 }}>
                  {lang}
                </Paper>
              );
            })}
          </Stack>
        ) : (
          <Typography>No language Provided</Typography>
        )}
      </DialogContent>
      {role === 'user' && (
        <DialogActions>
          <Stack direction='row' gap={1}>
            <Button variant='contained' color='warning'>
              Delete
            </Button>
            <Button variant='contained' onClick={setEditing}>
              Edit
            </Button>
          </Stack>
        </DialogActions>
      )}
      <Button
        onClick={closeModal}
        variant='text'
        sx={{ position: 'absolute', top: 0, right: 0 }}
      >
        <Close />
      </Button>
    </>
  );
};
