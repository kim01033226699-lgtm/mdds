import MinistryPage from '@/components/MinistryPage';

export const metadata = { title: '청년부 - 물댄동산교회' };

export default function Page() {
  return (
    <MinistryPage
      title="청년부"
      subtitle="하나님의 일꾼으로 자라가는 청년들"
      description="20대부터 30대 미혼 청년들이 함께 신앙과 삶을 나누는 공동체입니다."
      schedule={[
        { label: '예배 시간', value: '주일 오후 2시' },
        { label: '장소', value: '교회 3층 청년부실' },
        { label: '대상', value: '20~30대 미혼 청년' },
      ]}
      contact="031-553-0191"
    />
  );
}
