import DownloadIcon from '@mui/icons-material/Download';
import IconButton from '@mui/material/IconButton';

export default function DownloadButton({onClick}: {onClick: (params?:any) => void}) {
   return(
        <IconButton aria-label="Download results" title={"Download detailed results"} onClick={onClick}>
            <DownloadIcon />
        </IconButton>
   );
}