import { ReactNode } from 'react'
import { Layout } from '../Layout'
import ResizeLayout from './ResizeLayout'
import { useIsSp } from '@/hooks/util/useIsSp'
import { SpLayout } from './SpLayout'
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
        <SpLayout
          sideNavContents={
            <>
              <SideMainMenu />
              <CategoryList />
            </>
          }
        >
          {children}
        </SpLayout>
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
