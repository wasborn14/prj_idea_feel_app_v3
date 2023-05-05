import { ReactNode } from 'react'
import { Layout } from '../Layout'
import ResizeLayout from './ResizeLayout'
import { useIsSp } from '@/hooks/util/useIsSp'
import { SpSideMenuLayout } from './SpSideMenuLayout'
import { CategoryList } from '@/components/organisms/CategoryList'
import { SideMainMenu } from '@/components/organisms/SideMainMenu'

type Props = {
  children: ReactNode
}

export const SideMenuLayout = ({ children }: Props) => {
  const isSp = useIsSp()

  return (
    <Layout meta={{ pageTitle: 'Ifee - MyPage' }}>
      {isSp ? (
        <SpSideMenuLayout
          sideNavContents={
            <>
              {/* <SideMainMenu /> */}
              <CategoryList />
            </>
          }
        >
          {children}
        </SpSideMenuLayout>
      ) : (
        <ResizeLayout
          sideNavContents={
            <>
              <SideMainMenu />
              <CategoryList />
            </>
          }
        >
          {children}
        </ResizeLayout>
      )}
    </Layout>
  )
}
