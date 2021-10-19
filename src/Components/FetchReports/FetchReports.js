import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUserEmail, selectUserPhoto } from '../../features/user/userSlice'
import { db } from '../../firebase'
import styled from 'styled-components'

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ReactTimeago from 'react-timeago'
import { Avatar } from '@material-ui/core'
import { useQuery } from 'react-query'

const useStyles = makeStyles((theme) => ({
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        fontSize: "16px",
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
        border: "10px solid darkslategray",
    },

    prevent: {
        margin: "20px",
        color: "red",
        letterSpacing: "1.03px",
        fontStyle: "italic"
    },

    final__button: {
        marginBottom: "20px",
        marginTop: "10px"
    },

    report__heading: {
        textAlign: "center",
        fontSize: "36px",
        textDecoration: "underline",
    },
}));

function FetchReports() {

    const classes = useStyles();

    const userEmail = useSelector(selectUserEmail)
    const userPhoto = useSelector(selectUserPhoto)

    //Here we have used useQuery for fetching the reports from the database for a particular user. The useQuery returns an object with three fields namely isLoading(loading state), Error(if there is an error fetching the data), data(the response from the API)
    const { isLoading, error, data } = useQuery('reportsData', () =>
        fetch(`https://firestore.googleapis.com/v1/projects/unite-d0291/databases/(default)/documents/symptomReports/${userEmail}/reports`).then(res =>
            res.json()
        )
    )

    return (
        <React.Fragment>

            <CssBaseline />

            <h1 className={classes.report__heading}>Your saved Reports</h1>

            {data?.documents?.length > 0 ? data?.documents.map((report) => (
                <main className={classes.layout}>

                    <Paper className={classes.paper}>

                        <strong>Report Generated</strong> {" "}

                        <Typography component="h1" variant="h4" align="center" style={{ paddingBottom: "20px" }}>
                            Your Report
                        </Typography>

                        <React.Fragment>
                            <ImageContainer>
                                <img src={userPhoto} alt="" />
                            </ImageContainer>

                            <RowContainer>

                                <NameContainer>
                                    <h4>Name - {report.fields.name.stringValue}</h4>
                                </NameContainer>

                                <EmailContainer>
                                    <p><strong>Email</strong> - {report.fields.email.stringValue}</p>
                                </EmailContainer>

                            </RowContainer>

                            <InfoContainer>
                                <p><strong>Gender</strong> - {report.fields.gender.stringValue}</p>
                            </InfoContainer>
                            <InfoContainer>
                                <p><strong>Age</strong> - {report.fields.age.stringValue}</p>
                            </InfoContainer>
                            <InfoContainer>
                                <p><strong>fever</strong> - {report.fields.fever.stringValue}</p>
                            </InfoContainer>
                            <InfoContainer>
                                <p><strong>Symptoms</strong> - {report.fields.Serious_Symptom.stringValue}</p>
                            </InfoContainer>
                            <InfoContainer>
                                <p><strong>Other Symptom</strong> - {report.fields.Other_Symptom.stringValue}</p>
                            </InfoContainer>
                            <InfoContainer>
                                <p><strong>Risk</strong> - {report.fields.risk_factor.stringValue}</p>
                            </InfoContainer>
                            <InfoContainer>
                                <p><strong>Additional Risks</strong> - {report.fields.Additional_Risk.stringValue}</p>
                            </InfoContainer>
                        </React.Fragment>
                    </Paper>

                </main>
            )) :
                <ElseContainer>
                    {isLoading && (
                        <h2>Loading ...</h2>
                    )}

                    {error && (
                        <h2>An error has occurred: {error.message}</h2>
                    )}

                    <h1>No Reports Generated yet !!</h1>
                </ElseContainer>
            }

        </React.Fragment>
    )
}

const ImageContainer = styled.div`
    text-align: center;
    padding-bottom: 20px;

    img {
        border-radius: 50%;
    }
`

const RowContainer = styled.div`
    display: flex;
    justify-content: space-between;
`

const EmailContainer = styled.div``

const InfoContainer = styled.div`
    padding-top: 15px;
    margin: 15px;
`

const NameContainer = styled.div``

const ElseContainer = styled.div`
    text-align: center;
`

export default FetchReports
