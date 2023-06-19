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
import { Spacer } from '@/components/atoms/Spacer'
import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { feelListDataSelector, predictListDataSelector } from '@/store/domain/feelList'
import { Color } from '@/const'
import Annotation from 'chartjs-plugin-annotation'
import { useIsSp } from '@/hooks/util/useIsSp'
import { HStack } from '@/components/atoms/Stack/HStack'
import { SelectShortButton, ShortButton } from '@/components/atoms/Buttons/Button'
import { useGetFeelList } from '@/hooks/api/feel'
import { FormDatePicker } from '@/components/atoms/Forms/Date'
import { RecordModal } from './RecordModal'
import { mainContentsWidthSelector } from '@/store/app/window'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, zoomPlugin, Annotation)

export const FeelContents = () => {
  const feelListData = useSelector(feelListDataSelector)
  const predictListData = useSelector(predictListDataSelector)
  const mainContentsWidth = useSelector(mainContentsWidthSelector)
  const pcMargin = (mainContentsWidth - 1350) / 2
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
              const feel = ' Feel : ' + feel_data.detail.value
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
        suggestedMin: 1,
        suggestedMax: 5,
        ticks: {
          stepSize: 1,
          callback: function (value: number) {
            switch (value) {
              case 1:
                return isSp ? '' : 'very unhappy'
              case 2:
                return isSp ? '' : 'unhappy'
              case 3:
                return isSp ? '' : 'normal'
              case 4:
                return isSp ? '' : 'happy'
              case 5:
                return isSp ? '' : 'very happy'
              default:
                return ''
            }
          }
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
          yAxisKey: 'detail.value'
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
          yAxisKey: 'detail.value'
        },
        radius: 8
      }
    ],
    lineAtIndex: 6
  }

  useGetFeelList(baseDate, isSelectWeek)

  useEffect(() => {
    setIsSelectWeek(isSp)
  }, [isSp])

  const handleClickSelectButton = (isSelect: boolean) => {
    setIsSelectWeek(isSelect)
  }

  return (
    <ContentWrapper>
      {/* {!isSp && <Record baseDate={baseDate} setBaseDate={setBaseDate} isSelectWeek={isSelectWeek} />} */}
      {isRecordOpen && (
        <RecordModal
          baseDate={baseDate}
          setBaseDate={setBaseDate}
          isSelectWeek={isSelectWeek}
          onClick={() => setIsRecordOpen(!isRecordOpen)}
        />
      )}
      <Spacer y={24} />
      <LineWrapper isSp={isSp} pcMargin={pcMargin}>
        <Line
          // @ts-ignore
          options={options}
          data={data}
        />
      </LineWrapper>
      <Spacer y={40} />
      <HStack>
        <InputWrapper isSp={isSp}>
          <FormDatePicker baseDate={baseDate} setBaseDate={setBaseDate} />
        </InputWrapper>
        {!isSp && (
          <>
            <Spacer x={24} />
            <SelectShortButton select={isSelectWeek} onClick={() => handleClickSelectButton(true)}>
              Week
            </SelectShortButton>
            <Spacer x={12} />
            <SelectShortButton select={!isSelectWeek} onClick={() => handleClickSelectButton(false)}>
              Month
            </SelectShortButton>
          </>
        )}
        {!isSp && (
          <>
            <Spacer x={80} />
            <ShortButton onClick={() => setIsRecordOpen(!isRecordOpen)}>Record</ShortButton>
          </>
        )}
      </HStack>
      {isSp && (
        <>
          <Spacer x={80} />
          <ShortButton onClick={() => setIsRecordOpen(!isRecordOpen)}>Record</ShortButton>
        </>
      )}
    </ContentWrapper>
  )
}

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const LineWrapper = styled.div<{
  isSp: boolean
  pcMargin: number
}>`
  margin-top: 100px;
  display: flex;
  width: 1200px;
  height: 500px;
  ${({ pcMargin }) =>
    pcMargin &&
    css`
      margin-left: ${pcMargin}px;
      margin-right: ${pcMargin}px;
    `}
  ${({ isSp }) =>
    isSp &&
    css`
      margin: 0;
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
