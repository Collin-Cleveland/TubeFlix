import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col, Container } from 'reactstrap';
import { Translate, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './video.reducer';
import VideoThumbnail from './videoThumbnailComponent';
import ReactPlayer from 'react-player';
import { IComment } from 'app/shared/model/comment.model';
import axios from 'axios';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

import './video-detail.scss'

export const VideoDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  const [commentsByVideoId, setCommentsByVideoId] = useState<IComment[]>([])

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  useEffect(() => {
    axios.get(`/api/comments/video/${id}`)
    .then(response => {
      //console.log(response.data)
      setCommentsByVideoId(response.data)
    })
  }, [])

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const videoEntity = useAppSelector(state => state.video.entity);
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const getUserNameById = (id: number) => {
    if (id === 1) {return 'John Doe'}
    if (id === 2) {return 'Grace Smith'}
  }
  const getFakeUserNameById = (id: number) => {
    if (id === 1) {return 'John Doe'}
    if (id === 2) {return 'Grace Smith'}
    if (id === 3) {return 'Jessica Collins'}
    if (id === 4) {return 'Bobby Johnson'}
    if (id === 5) {return 'Eric Snafu'}
    if (id === 6) {return 'Josh Cunningham'}
    if (id === 7) {return 'Dan Brenneman'}
    if (id === 8) {return 'Joe Elk'}
    if (id === 9) {return 'Robert Causic'}
    if (id === 10) {return 'Linda White'}
    if (id === 11) {return 'Pam McCarthy'}
    if (id === 12) {return 'Fred Ali'}
  }
  
  return (
    <Container>
    <Row>
      <Col>
        
          {/* Youtube player on page from video link in DB */}

          <dd>
            <ReactPlayer url={videoEntity.videoLink} controls={true}>
              <VideoThumbnail videoLink={videoEntity.videoLink}/>
            </ReactPlayer>
          </dd>
          <dd>Video #{videoEntity.id}</dd>
          <dt>
            <span id="title">
              <Translate contentKey="groupProjectApp.video.title">Title</Translate>
            </span>
          </dt>
          <dd>{videoEntity.title}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="groupProjectApp.video.description">Description</Translate>
            </span>
          </dt>
          <dd>{videoEntity.description}</dd>
          <dt>
            <span id="uploadDate">
              <Translate contentKey="groupProjectApp.video.uploadDate">Upload Date</Translate>
            </span>
          </dt>
          <dd>
            {videoEntity.uploadDate ? <TextFormat value={videoEntity.uploadDate} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
          {/* <dt>
            <Translate contentKey="groupProjectApp.video.uploader">Uploader</Translate>
          </dt>
          <dd>{videoEntity.uploader ? videoEntity.uploader.id : ''}</dd> */}
        
        <Button tag={Link} to="/video" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
      </Col>
      <Col>
      <div>
      <h2 className='center'>Comments</h2>
      <div>&nbsp;</div>
        <Link to="/comment/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
          <FontAwesomeIcon icon="plus" />
          <Translate contentKey="groupProjectApp.comment.home.createLabel">Create new Comment</Translate>
        </Link>
        <div>&nbsp;</div>
        <ul>
          {commentsByVideoId.length !== 0 ? (
            commentsByVideoId.map((comment) => (
              <Box sx={{ width: '90%', border: 1, borderColor: 'primary.main', m: 2 }}>
                <Stack key={comment.id} mt={2}>
                  <Item>
                    <Container>
                      <Row>
                        <Col>
                        <div style={{ fontWeight: 'bold', fontSize: 20 }}>{comment.body}</div>
                        </Col>
                        <Col>
                        <div>{getFakeUserNameById(comment.id)} on {comment.commentDate}</div>
                        </Col>
                      </Row>
                    </Container>
                  </Item>
                </Stack>
              </Box>
            ))
          ) : (
            <li>No comments found</li>
          )}
        </ul>
      </div>
      </Col>
    </Row>
    </Container>
  );
};

export default VideoDetail;
