import React from 'react'
import { Card, CardContent, Typography } from "@material-ui/core";
import './InfoBox.css';

const colorScheme = {
    cases: '#CC1034',
    recovered: '#7dd71d',
    deaths: '#fb4443'
}

function InfoBox({ title, cases, active, total, ...props }) {


    return (
        <Card
            onClick={props.onClick}
            className={`infoBox ${active && props.act}`}
        >
            < CardContent >

                < Typography className="infoBox__title" color="textSecondary">
                    {title}
                </Typography>
                <h2
                    className="infoBox__cases"
                    style={{ 'color': colorScheme[props.act] }}
                >{cases}</h2>
                <Typography className="infoBox__total" color="textSecondary">
                    {total} Total
                </Typography>

            </CardContent >
        </ Card >
    )
}

export default InfoBox
