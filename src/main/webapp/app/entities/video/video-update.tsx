import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, Container } from 'reactstrap';
import { Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities as getVideoUsers } from 'app/entities/video-user/video-user.reducer';
import { getEntity, updateEntity, createEntity } from './video.reducer';

import { useForm } from 'react-hook-form';

import './video-update.scss'

export const VideoUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const videoUsers = useAppSelector(state => state.videoUser.entities);
  const videoEntity = useAppSelector(state => state.video.entity);
  const loading = useAppSelector(state => state.video.loading);
  const updating = useAppSelector(state => state.video.updating);
  const updateSuccess = useAppSelector(state => state.video.updateSuccess);

  const handleClose = () => {
    navigate('/video');
  };

  useEffect(() => {
    if (!isNew) {
      dispatch(getEntity(id));
    }

    dispatch(getVideoUsers({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...videoEntity,
      ...values,
      uploader: videoUsers.find(it => it.id.toString() === values.uploader.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...videoEntity,
          uploader: videoEntity?.uploader?.id,
        };

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
      const formData = new FormData();
      formData.append("file", data.file[0]);

      const res = await fetch("api/fileupload", {
          method: "POST",
          body: formData,
      }).then((res) => res.json());
      alert(JSON.stringify(`${res.message}, status: ${res.status}`));
  };

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div>
      <Container>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="groupProjectApp.video.home.createOrEditLabel" data-cy="VideoCreateUpdateHeading">
            <Translate contentKey="groupProjectApp.video.home.createOrEditLabel">Create or edit a Video</Translate>
          </h2>
        </Col>
      </Row>
      <Row>
        <Col md="6">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="video-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('groupProjectApp.video.videoLink')}
                id="video-videoLink"
                name="videoLink"
                data-cy="videoLink"
                type="textarea"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('groupProjectApp.video.title')}
                id="video-title"
                name="title"
                data-cy="title"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('groupProjectApp.video.description')}
                id="video-description"
                name="description"
                data-cy="description"
                type="text"
              />
              <ValidatedField
                label={translate('groupProjectApp.video.uploadDate')}
                id="video-uploadDate"
                name="uploadDate"
                data-cy="uploadDate"
                type="date"
              />
              <ValidatedField
                id="video-uploader"
                name="uploader"
                data-cy="uploader"
                label={translate('groupProjectApp.video.uploader')}
                type="select"
              >
                <option value="" key="0" />
                {videoUsers
                  ? videoUsers.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/video" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
        <Col md="6">
        <body className='notbackground'>
          <div>
            <Row className="justify-content-center">File Upload to S3</Row>
            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div>Title:</div>
                <input type="text" name="title" required/>
                {/* <div>Description:</div>
                <input type="text" name="description"/> */}
                <div>&nbsp;</div>
                <Button color="primary"><input type="file" {...register("file")} /></Button>
                <div>&nbsp;</div>
                <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" /> Submit
                </Button>             
              </form>
            </div>
              {/* <div>
                  <form action="upload" method="post" encType="multipart/form-data">
                      <p>
                          Title:
                          <input type="text" name="title" required/>
                      </p>
                      <p>
                          Description:
                          <input type="text" name="description"/>
                      </p>
                      
                      <p>
                          <input type="file" name="file" required />
                      </p>
                      
                      <p>
                          <button type="submit">Submit</button>
                      </p>
                  </form>
              </div> */}
          </div>
        </body>
        </Col>
      </Row>
      </Container>
    </div>
  );
};

export default VideoUpdate;
