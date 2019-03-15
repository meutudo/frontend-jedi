import React from 'react';
import Pagination from 'react-bootstrap/Pagination';
import { LinkContainer } from 'react-router-bootstrap';
import { withRouter } from "react-router-dom";

// const renderPagination = count => {
//   const pagesAmount = Math.ceil(count / 6);
//   const pagesAmountIterable = new Array(pagesAmount).fill('');
//   return pagesAmountIterable.map((item, index) => <Pagination.Item key={index+1}>{index+1}</Pagination.Item>);
// }

const ArrowsPagination = props => {
  const nextUrl = props.next ? props.next.split('=')[1] : null;
  const previousUrl = props.previous ? props.previous.split('=')[1] : null;
  const { pathname } = props.history.location;

  return (
    <Pagination>
        {
          <Pagination.Prev onClick={ () => { props.onPaginationChange('prev') } } disabled={!previousUrl}>
          </Pagination.Prev>
        }
        {
          <Pagination.Next onClick={ () => { props.onPaginationChange('next') } } disabled={!nextUrl}>
          </Pagination.Next>
        }
    </Pagination>
  );
}

export default withRouter(ArrowsPagination);


// <Pagination>
//   {
//       <LinkContainer to={`${pathname}?page=${previousUrl}` || ''} disabled={!previousUrl} className="pagination-md">
//         <Pagination.Prev></Pagination.Prev>
//       </LinkContainer>
//   }
//   {
//       <LinkContainer to={`${pathname}?page=${nextUrl}` || ''} disabled={!nextUrl} className="pagination-md">
//         <Pagination.Next></Pagination.Next>
//       </LinkContainer>
//   }
// </Pagination>
