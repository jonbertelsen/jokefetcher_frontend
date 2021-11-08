import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { v4 as uuid } from 'uuid';

function Webscraper({ facade, setErrorMessage }) {
  const [parallelFetch, setParallelFetch] = useState({
    title: '',
    timeSpent: '',
    tags: [],
  });

  const [sequentialFetch, setSequentialFetch] = useState({
    title: '',
    timeSpent: '',
    tags: [],
  });

  const updateParallel = (data) => {
    setParallelFetch({
      title: data.title,
      timeSpent: data.timeSpent,
      tags: data.tags,
    });
  };

  const updateSequential = (data) => {
    setSequentialFetch({
      title: data.title,
      timeSpent: data.timeSpent,
      tags: data.tags,
    });
  };

  useEffect(() => {
    facade.fetchData('scrape/parallel', updateParallel, setErrorMessage);
    facade.fetchData('scrape/sequental', updateSequential, setErrorMessage);
  }, [facade, setErrorMessage]);

  return (
    <>
      <Row className="mt-4">
        <Col>
          <h4>{parallelFetch.title}</h4>
          <p>{parallelFetch.timeSpent}</p>
          <ul>
            {parallelFetch.tags.map((site) => (
              <li key={uuid()}>
                <a href={site.url}>{site.url}</a>
                <ul>
                  <li key={uuid()}>div-count: {site.divCount}</li>
                  <li>body-count: {site.bodyCount}</li>
                </ul>
              </li>
            ))}
          </ul>
        </Col>
        <Col>
          <h4>{sequentialFetch.title}</h4>
          <p>{sequentialFetch.timeSpent}</p>
          <ul>
            {sequentialFetch.tags.map((site) => (
              <li key={uuid()}>
                <a href={site.url}>{site.url}</a>
                <ul>
                  <li key={uuid()}>div-count: {site.divCount}</li>
                  <li>body-count: {site.bodyCount}</li>
                </ul>
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    </>
  );
}

export default Webscraper;
