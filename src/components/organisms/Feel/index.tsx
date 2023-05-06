import { VStack } from '@/components/atoms/Stack/VStack'
import styled, { css } from 'styled-components'
import zoomPlugin from 'chartjs-plugin-zoom'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TooltipItem,
  ChartType
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { Record } from './Record'
import { Spacer } from '@/components/atoms/Spacer'
import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { feelListDataSelector, predictListDataSelector } from '@/store/domain/feelList'
import { Color } from '@/const'
import Annotation from 'chartjs-plugin-annotation'
import { useIsSp } from '@/hooks/util/useIsSp'
import { HStack } from '@/components/atoms/Stack/HStack'
import { GeneralButton, SelectButton } from '@/components/atoms/Buttons/First/Button'
import { useGetFeelList } from '@/hooks/api/feel'
import { FormDatePicker } from '@/components/atoms/Forms/Second/Date'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, zoomPlugin, Annotation)

export const FeelContents = () => {
  const feelListData = useSelector(feelListDataSelector)
  const predictListData = useSelector(predictListDataSelector)
  const Today = new Date()
  const [baseDate, setBaseDate] = useState(Today)
  const isSp = useIsSp()
  const [isSelectWeek, setIsSelectWeek] = useState(false)
  const [isRecordOpen, setIsRecordOpen] = useState(false)

  const convertedBaseDate = useMemo(() => {
    const month = ('0' + (baseDate.getMonth() + 1)).slice(-2)
    const day = ('0' + baseDate.getDate()).slice(-2)
    return `${month}/${day}`
  }, [baseDate])

  // useEffect(() => {
  //   console.log({ baseDate })
  //   console.log({ isSelectWeek })
  //   console.log({ feelListData })
  // }, [baseDate, isSelectWeek, feelListData])

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const
      },
      title: {
        display: false,
        text: ''
      },
      // TODO: zoomの後、表示を戻せないので修正の必要あり
      // zoom: {
      //   pan: {
      //     enabled: true,
      //     mode: "x",
      //   },
      //   zoom: {
      //     pinch: {
      //       enabled: true,
      //     },
      //     wheel: {
      //       enabled: true,
      //     },
      //     mode: "x",
      //   },
      // },
      // カーソルを合わせた時に出るツールチップ設定
      tooltip: {
        yAlign: 'bottom',
        callbacks: {
          // title: () => {
          //   return "test";
          // },
          label: (tooltipItem: TooltipItem<ChartType>) => {
            const feel_data = tooltipItem.dataset.data[tooltipItem.dataIndex]
            if (feel_data) {
              // TODO: Error回避
              // @ts-ignore
              const feel = ' Feel : ' + feel_data.detail.feel
              // @ts-ignore
              const reason = ' Reason : ' + feel_data.detail.reason
              // @ts-ignore
              const memo = ' Memo : ' + feel_data.detail.memo
              return [feel, reason, memo]
            }
            return ''
          }
          // footer: () => {
          //   return "test";
          // },
        },
        // 見た目要素設定
        bodyFont: {
          size: 16
        },
        bodySpacing: 10,
        backgroundColor: `#d59a42`
      }
    },
    scales: {
      y: {
        display: true,
        suggestedMin: -5,
        suggestedMax: 5,
        beginAtZero: true,
        ticks: {
          stepSize: 1
        }
      }
    },
    annotations: {
      line: {
        type: 'line',
        xMin: `${convertedBaseDate}`,
        xMax: `${convertedBaseDate}`,
        borderColor: `${Color.DARK_BROWN1}`,
        borderWidth: 2
      }
    }
  }

  const data = {
    datasets: [
      {
        spanGaps: true,
        label: ' Predict ( 予測 ) ',
        data: predictListData,
        borderColor: `${Color.PREDICT_COLOR}`,
        backgroundColor: `${Color.PREDICT_COLOR}`,
        lineTension: 0.4,
        parsing: {
          xAxisKey: 'date',
          yAxisKey: 'detail.feel'
        },
        radius: 8
      },
      {
        spanGaps: true,
        label: ' Record ( 記録 ) ',
        data: feelListData,
        borderColor: `${Color.RECORD_COLOR}`,
        backgroundColor: `${Color.RECORD_COLOR}`,
        lineTension: 0.4,
        parsing: {
          xAxisKey: 'date',
          yAxisKey: 'detail.feel'
        },
        radius: 8
      }
    ],
    lineAtIndex: 6
  }

  const { refetch } = useGetFeelList(baseDate, isSelectWeek)

  useEffect(() => {
    refetch()
  }, [isSelectWeek, refetch])

  // useEffect(() => {
  //   const dates = getStartAndEndDate(baseDate, isSelectWeek)
  //   const getFeelList = () => {
  //     dispatch(dataActions.setIsLoading({ isLoading: true }))
  //     fetchFeelList(dates.startDate, dates.endDate)
  //       .then((res) => {
  //         dispatch(feelListActions.setFeelListData(res.data))
  //         dispatch(dataActions.setIsLoading({ isLoading: false }))
  //       })
  //       .catch((err) => {
  //         console.error(err.message)
  //         dispatch(dataActions.setIsLoading({ isLoading: false }))
  //       })
  //   }

  //   getFeelList()
  // }, [dispatch, baseDate, isSelectWeek])

  // const selectDate = (selectedDate: Date | null) => {
  //   setBaseDate(selectedDate || Today)
  //   refetch()
  //   const dates = getStartAndEndDate(selectedDate ?? Today, isSelectWeek)
  //   fetchFeelList(dates.startDate, dates.endDate)
  //     .then((res) => {
  //       dispatch(feelListActions.setFeelListData(res.data))
  //     })
  //     .catch((err) => {
  //       console.error(err.message)
  //     })
  // }

  const handleClickSelectButton = (isSelect: boolean) => {
    setIsSelectWeek(isSelect)
    // const dates = getStartAndEndDate(baseDate, isSelect)
    // fetchFeelList(dates.startDate, dates.endDate)
    //   .then((res) => {
    //     dispatch(feelListActions.setFeelListData(res.data))
    //   })
    //   .catch((err) => {
    //     console.error(err.message)
    //   })
  }

  return (
    <VStack>
      <ContentWrapper>
        {isSp && (
          <>
            <Spacer y={12} />
            <GeneralButton width={200} onClick={() => setIsRecordOpen(!isRecordOpen)}>
              {isRecordOpen ? 'Close' : 'Record'}
            </GeneralButton>
          </>
        )}
        {!isSp && <Record baseDate={baseDate} setBaseDate={setBaseDate} isSelectWeek={isSelectWeek} />}
        {isRecordOpen && <Record baseDate={baseDate} setBaseDate={setBaseDate} isSelectWeek={isSelectWeek} />}
        <Spacer y={24} />
        <LineWrapper isSp={isSp}>
          <Line
            // @ts-ignore
            options={options}
            data={data}
          />
        </LineWrapper>
        <Spacer y={24} />
        <HStack>
          <InputWrapper isSp={isSp}>
            <FormDatePicker baseDate={baseDate} setBaseDate={setBaseDate} />
          </InputWrapper>
          {!isSp && (
            <>
              <Spacer x={24} />
              <SelectButton width={200} height={32} select={isSelectWeek} onClick={() => handleClickSelectButton(true)}>
                Week
              </SelectButton>
              <Spacer x={12} />
              <SelectButton
                width={200}
                height={32}
                select={!isSelectWeek}
                onClick={() => handleClickSelectButton(false)}
              >
                Month
              </SelectButton>
            </>
          )}
        </HStack>
      </ContentWrapper>
    </VStack>
  )
}

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const LineWrapper = styled.div<{ isSp: boolean }>`
  width: 80%;
  height: 500px;
  ${({ isSp }) =>
    isSp &&
    css`
      height: 450px;
      width: 350px;
    `}
`

const InputWrapper = styled.div<{ isSp: boolean }>`
  width: 300px;

  ${({ isSp }) =>
    isSp &&
    css`
      margin-bottom: 40px;
    `}
`