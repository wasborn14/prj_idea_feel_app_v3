import { SideMenuLayout } from '@/components/templates/SideMenuLayout'
import { useRouter } from 'next/router'
// import { IdeaListContainer } from '@/components/organisms/IdeaListContainer'
// import { SideMenuLayout } from '@/components/templates/SideMenuLayout'
// import { useIsSp } from '@/hooks/util/useIsSp'
// import dynamic from 'next/dynamic'

export const Idea = () => {
  const router = useRouter()
  const id = router.query['category-id']
  return (
    <SideMenuLayout>
      <>{id}</>
    </SideMenuLayout>
  )
  // const isSp = useIsSp()
  // const router = useRouter()
  // const isFeel = router.query['category-id'] === 'feel' ? true : false

  // const DynamicFeel = dynamic(() => import('@/components/organisms/Feel').then((mod) => mod.FeelContents), {
  //   ssr: false
  // })

  // return <SideMenuLayout>{isFeel ? <DynamicFeel /> : <IdeaListContainer vertical={isSp} />}</SideMenuLayout>
}
