import { Close } from "@mui/icons-material";
import { Button, Dialog, DialogContent, DialogTitle, Divider, IconButton, Tooltip, Typography } from "@mui/material";
import { styled } from "@mui/system";
import {FC, ReactNode, useState} from "react"


const DialogTitleStyled = styled(DialogTitle)`
    margin: 0;
    padding: 20px;
`
const CloseButton = styled(IconButton)`
  position: absolute;
  right: 10px;
  top: 10px;
`;

const CustomModal = ({title, showIcon, description, content} : {title: String, showIcon: ReactNode, description: String; content: ReactNode}) => {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen)
    }
    return (
        <> 
            <Tooltip title={title}>
                <IconButton color="inherit" onClick={toggle}>
                    {showIcon}
                </IconButton>
            </Tooltip>
            <Dialog
                disableScrollLock
                onClose={setIsOpen}
                open={isOpen}
                fullWidth
                maxWidth="md"
            >
                <DialogTitleStyled>
                    <Typography variant="h5">{description}</Typography>
                    <CloseButton color="inherit" onClick={toggle}>
                        <Close />
                    </CloseButton>
                </DialogTitleStyled>     
                <Divider/>
                <DialogContent>{content}</DialogContent>           
            </Dialog>
        </>
    )
}

export default CustomModal;