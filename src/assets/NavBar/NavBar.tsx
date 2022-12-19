import { AppBar, Button, ButtonGroup, IconButton, Link, Toolbar, Tooltip, Typography } from "@mui/material";
import { styled } from "@mui/system";
import GitHubIcon from "@mui/icons-material/GitHub"
import CustomModal from "./CustomModal";
import Instructions from "./Instructions";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';


const NavbarBox = styled('div')`
  flex-grow: 1;
  margin-left: 0px;
`

const StyledNavBar = styled(AppBar)`
  position: static;
`;

const Title = styled(Typography)`
  flex-grow: 1;
  margin-left: 10px;
  text-align: left;
`

const NavBar = () => {
    return (
      <NavbarBox>
      <StyledNavBar>
        <Toolbar>
          <Title variant="h5">
            Lorentz Transform Visualiser
          </Title>
          <CustomModal title={'Instructions'} showIcon={<QuestionMarkIcon />} description={'How to use this thing'} content={<Instructions />} />
          <Tooltip title="link to Github repo">
            <Link href="https://github.com/Expressionless-Ball-Thing/relativity-visualiser">
              <IconButton aria-label="link to Github repo">
                <GitHubIcon color="inherit"/>
              </IconButton>
            </Link>
          </Tooltip>
        </Toolbar>
      </StyledNavBar>
    </NavbarBox>
    )
}

export default NavBar;