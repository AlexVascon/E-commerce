import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllUsers, deleteUser } from '../actions/userActions'
import { Error, Heading, LoadingSpinner, View } from '../components/MyLibrary'
import { Table, TR, TH, TD } from '../components/Table'
import DeleteIcon from '@mui/icons-material/Delete'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CloseIcon from '@mui/icons-material/Close'
import ReactPaginate from 'react-paginate'

export default function AccountList() {
  const dispatch = useDispatch()
  const { allUsers, fetchAllUsersError, loadingFetchAllUsers } = useSelector(
    (state) => state.fetchAllUsers
  )
  const [pageNumber, setPageNumber] = useState(0)

  useEffect(() => {
    dispatch(fetchAllUsers(pageNumber))
  }, [dispatch, pageNumber])

  const handleDelete = (userId) => {
    if (window.confirm('are you sure')) {
      dispatch(deleteUser(userId))
    }
  }

  const changePage = ({ selected }) => setPageNumber(selected)

  const pagination = () => {
    return (
      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        pageCount={allUsers && allUsers.pageCount}
        onPageChange={changePage}
        forcePage={pageNumber}
        containerClassName={'pagination-btns'}
        previousLinkClassName={'previous-btn'}
        nextLinkClassName={'next-btn'}
        disabledClassName={'pagination-disabled'}
        activeClassName={'pagination-active'}
      />
    )
  }

  return (
    <View>
      <Heading center size='1.5rem' top='1%' bottom='1%'>
        Users
      </Heading>
      <Table>
        <thead>
          <TR>
            <TH>ID</TH>
            <TH>NAME</TH>
            <TH>EMAIL</TH>
            <TH>ADMIN</TH>
            <TH>DELETE</TH>
          </TR>
        </thead>
        <tbody>
          {allUsers &&
            allUsers.users.map((user) => (
              <TR key={user._id}>
                <TD>{user._id}</TD>
                <TD>{user.username}</TD>
                <TD>{user.email}</TD>
                {user.isAdmin ? (
                  <TD green>
                    <CheckCircleIcon />
                  </TD>
                ) : (
                  <TD red>
                    <CloseIcon />
                  </TD>
                )}
                <TD>
                  <DeleteIcon onClick={() => handleDelete(user._id)} />
                </TD>
              </TR>
            ))}
        </tbody>
      </Table>
      {allUsers && pagination()}
      {loadingFetchAllUsers && <LoadingSpinner size='10rem' />}
      {fetchAllUsersError && <Error>{fetchAllUsersError}</Error>}
    </View>
  )
}
