import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './like.reducer';

export const LikeDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const likeEntity = useAppSelector(state => state.like.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="likeDetailsHeading">
          <Translate contentKey="groupProjectApp.like.detail.title">Like</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{likeEntity.id}</dd>
          <dt>
            <Translate contentKey="groupProjectApp.like.videoUser">Video User</Translate>
          </dt>
          <dd>{likeEntity.videoUser ? likeEntity.videoUser.id : ''}</dd>
          <dt>
            <Translate contentKey="groupProjectApp.like.video">Video</Translate>
          </dt>
          <dd>{likeEntity.video ? likeEntity.video.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/like" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/like/${likeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default LikeDetail;
