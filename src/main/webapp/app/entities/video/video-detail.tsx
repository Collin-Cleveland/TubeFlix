import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
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
    axios.get(`/api/comments/video/{id}?id=${id}`)
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
  return (
    <Row>
      <Col md="8">
        
          {/* Youtube player on page from video link in DB */}

          <dd>
            <ReactPlayer url={videoEntity.videoLink} controls={true}>
              <VideoThumbnail videoLink={videoEntity.videoLink} />
            </ReactPlayer>
          </dd>
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
          <dt>
            <Translate contentKey="groupProjectApp.video.uploader">Uploader</Translate>
          </dt>
          <dd>{videoEntity.uploader ? videoEntity.uploader.id : ''}</dd>
        
        <Button tag={Link} to="/video" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/video/${videoEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
      
      <div>
      <h2 className = "center">Comments</h2>
        <ul>
          {commentsByVideoId.length !== 0 ? (
            commentsByVideoId.map((comment) => (
              <Box sx={{ width: '100%' }}>
                <Stack key={comment.id}>
                  <Item>
                    <div>User: {comment.videoUser.id}</div>
                    <div>Comment: {comment.body}</div>
                    <div>Date: {comment.commentDate}</div>
                  </Item>
                </Stack>
              </Box>
            ))
          ) : (
            <li>No comments found</li>
          )}
        </ul>
      </div>
    </Row>
  );
};

export default VideoDetail;
