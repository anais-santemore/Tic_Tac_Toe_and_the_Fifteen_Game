import React from 'react';

// MUI Components
import Typography from '@material-ui/core/Typography';

export default function StatusHeader(props) {
    const gameNumber = props.gameNumber;
    return (
        <Typography color="textPrimary" align='center' component='h1' variant='h4' noWrap gutterBottom>
            Game&nbsp;{gameNumber}:
        </Typography>
    )
}
