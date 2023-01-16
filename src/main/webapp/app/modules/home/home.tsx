import './home.scss';

import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getSortState, TextFormat, Translate } from 'react-jhipster';
import { Row, Col, Alert, Button, Table, Container } from 'reactstrap';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { useEffect } from 'react';
import { getEntities } from 'app/entities/video-user/video-user.reducer';
import VideoThumbnail from 'app/entities/video/videoThumbnailComponent';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import InfiniteScroll from 'react-infinite-scroll-component';
import { reset } from '../administration/user-management/user-management.reducer';

export const Home = () => {

  const dispatch = useAppDispatch();

  const location = useLocation();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(location, ITEMS_PER_PAGE, 'id'), location.search)
  );
  const [sorting, setSorting] = useState(false);

  const videoList = useAppSelector(state => state.video.entities);
  const loading = useAppSelector(state => state.video.loading);
  const links = useAppSelector(state => state.video.links);
  const updateSuccess = useAppSelector(state => state.video.updateSuccess);

  const getAllEntities = () => {
    dispatch(
      getEntities({
        page: paginationState.activePage - 1,
        size: paginationState.itemsPerPage,
        sort: `${paginationState.sort},${paginationState.order}`,
      })
    );
  };

  const resetAll = () => {
    dispatch(reset());
    setPaginationState({
      ...paginationState,
      activePage: 1,
    });
    dispatch(getEntities({}));
  };

  useEffect(() => {
    resetAll();
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      resetAll();
    }
  }, [updateSuccess]);

  useEffect(() => {
    getAllEntities();
  }, [paginationState.activePage]);

  const handleLoadMore = () => {
    if ((window as any).pageYOffset > 0) {
      setPaginationState({
        ...paginationState,
        activePage: paginationState.activePage + 1,
      });
    }
  };

  useEffect(() => {
    if (sorting) {
      getAllEntities();
      setSorting(false);
    }
  }, [sorting]);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Container>
      <Row>
        <Col>
      <div>
      <div className="table-responsive">
        <InfiniteScroll
          dataLength={videoList ? videoList.length : 0}
          next={handleLoadMore}
          hasMore={paginationState.activePage - 1 < links.next}
          loader={<div className="loader">Loading ...</div>}
        >
          {videoList && videoList.length > 0 ? (
            <Table responsive>
              <tbody>
                {videoList.slice(0,videoList.length/3).map((video, i) => (
                  <tr key={`entity-${i}`} data-cy="entityTable">
                    <td>
                      <div className="center">
                      <div className="header">{video.title}</div>
                      <Button tag={Link} to={`/video/${video.id}`} className="button">
                        <VideoThumbnail videoLink = {video.videoLink} />
                      </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            !loading && (
              <div className="alert alert-warning">
                <Translate contentKey="groupProjectApp.video.home.notFound">No Videos found</Translate>
              </div>
            )
          )}
        </InfiniteScroll>
      </div>
    </div>
    </Col>
    <Col>
      <div>
      <div className="table-responsive">
        <InfiniteScroll
          dataLength={videoList ? videoList.length : 0}
          next={handleLoadMore}
          hasMore={paginationState.activePage - 1 < links.next}
          loader={<div className="loader">Loading ...</div>}
        >
          {videoList && videoList.length > 0 ? (
            <Table responsive>
              <tbody>
                {videoList.slice(videoList.length/3, videoList.length*(2/3)).map((video, i) => (
                  <tr key={`entity-${i}`} data-cy="entityTable">
                    <td>
                      <div className="center">
                      <div className="header">{video.title}</div>
                      <Button tag={Link} to={`/video/${video.id}`} className="button">
                        <VideoThumbnail videoLink = {video.videoLink} />
                      </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            !loading && (
              <div className="alert alert-warning">
                <Translate contentKey="groupProjectApp.video.home.notFound">No Videos found</Translate>
              </div>
            )
          )}
        </InfiniteScroll>
      </div>
    </div>
    </Col>
    <Col>
      <div>
      <div className="table-responsive">
        <InfiniteScroll
          dataLength={videoList ? videoList.length : 0}
          next={handleLoadMore}
          hasMore={paginationState.activePage - 1 < links.next}
          loader={<div className="loader">Loading ...</div>}
        >
          {videoList && videoList.length > 0 ? (
            <Table responsive>
              <tbody>
                {videoList.slice(videoList.length*(2/3), videoList.length).map((video, i) => (
                  <tr key={`entity-${i}`} data-cy="entityTable">
                    <td>
                      <div className="center">
                      <div className="header">{video.title}</div>
                      <Button tag={Link} to={`/video/${video.id}`} className="button">
                        <VideoThumbnail videoLink = {video.videoLink} />
                      </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            !loading && (
              <div className="alert alert-warning">
                <Translate contentKey="groupProjectApp.video.home.notFound">No Videos found</Translate>
              </div>
            )
          )}
        </InfiniteScroll>
      </div>
    </div>
    </Col>
    </Row>
    </Container>

      
  );
};

export default Home;
