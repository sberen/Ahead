import React, {useState, useEffect} from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Skeleton from 'react-loading-skeleton';
import {Business} from '../util/business';
import {Queue} from '../util/queue';
import './queue-view.css';
import './queue-wrapper.css';
import ListGroup from 'react-bootstrap/ListGroup';
import {QueueView} from './queue-view';

const QueueLoadingPage = () => {
  return (
    <Container>
      <Card id='queue-card'>
        <Card.Header>
          <Row>
            <Col md={1}>#</Col>
            <Col md={4}>Name</Col>
            <Col md={2}>Party Size</Col>
            <Col md={2}>Time in Line</Col>
            <Col md={3}>Actions</Col>
          </Row>
        </Card.Header>
        <ListGroup id='queue' variant='flush'>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((val) => (<ListGroup.Item key={val} className='queue-entry'>
            <Skeleton />
          </ListGroup.Item>))}
        </ListGroup>
      </Card>
      <Card id='control-group-card'>
        <Card.Body>
          <Skeleton height={100}/>
        </Card.Body>
      </Card>
      <Card id='party-card'>
        <Card.Body>
          <Card.Title as='h1'>
            <Skeleton height={100}/>
          </Card.Title>
          <Card.Text>
            <Skeleton count={3} width={450}/>
          </Card.Text>
          <Skeleton height={175}/>
        </Card.Body>
      </Card>
    </Container>
  );
};

const DefaultQueuePage = () => {
  return (
    <Container>
      <Card id='default-container'>
        <Card.Body id='no-business-info-body'>
          <Card.Title id='no-business-info-title'>
            You haven't filled out your business profile yet. You
            must do this before you can use a Radius queue.
          </Card.Title>
          <Card.Text id='no-business-info-text'>
            To fill out your business profile, click the "Profile"
            tab in the navigation bar. From there you can enter your
            business information.
          </Card.Text>
          <img
            src='../../images/radius-logo.PNG'
            alt='Radius Logo'
            id='no-business-info-logo'
          />
        </Card.Body>
      </Card>
    </Container>
  );
};

interface QueueTabProps {
  business: Business | undefined | null,
  queue: Queue | undefined,
  setQueue: (q: Queue) => void,
}

const QueueTab = ({business, queue, setQueue}: QueueTabProps) => {
  const [isBusinessLoading, setBusinessLoading] = useState<boolean>(true);
  const [isQueueLoading, setQueueLoading] = useState<boolean>(true);
  const [isDefault, setDefault] = useState<boolean>(false);

  useEffect(() => {
    if (business === undefined) {
      setDefault(true);
      setBusinessLoading(false);
      setQueueLoading(false);
    }
  }, []);

  useEffect(() => {
    if (business !== null) {
      setBusinessLoading(false);
      if (business === undefined) {
        setDefault(true);
        setQueueLoading(false);
      }
    }
  }, [business]);

  useEffect(() => {
    if (queue) {
      setQueueLoading(false);
    }
  }, [queue]);

  return (isBusinessLoading || isQueueLoading) ?
    <QueueLoadingPage/> :
    isDefault ?
    <DefaultQueuePage/> :
    <QueueView queue={queue!} setQueue={setQueue}/>;
};

export default QueueTab;
