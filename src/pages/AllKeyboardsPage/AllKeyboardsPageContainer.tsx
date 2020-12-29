import { Center, Spinner } from '@chakra-ui/react'
import { RouteComponentProps } from '@reach/router'
import PageLayout from 'components/PageLayout'
import { FC, useEffect } from 'react'
import { useSelector } from 'react-redux'
import store, { RootState, useAppDispatch } from 'store'
import AllKeyboardsPage from './AllKeyboardsPage'

interface AllKeyboardsPageContainerProps extends RouteComponentProps {}

const AllKeyboardsPageContainer: FC<AllKeyboardsPageContainerProps> = () => {
  const dispatch = useAppDispatch()

  const isLoading = useSelector(
    (state: RootState) => state.keyboards.isLoadingNames,
  )

  useEffect(() => {
    dispatch(store.keyboards.thunks.fetchKeyboardList())
  }, [dispatch])

  const keyboards = useSelector(store.keyboards.selectors.selectNames)

  return (
    <PageLayout>
      {isLoading ? (
        <Center>
          <Spinner size="lg" speed=".8s" />
        </Center>
      ) : (
        <AllKeyboardsPage keyboards={keyboards} />
      )}
    </PageLayout>
  )
}

export default AllKeyboardsPageContainer
