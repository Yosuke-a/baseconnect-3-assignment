'use client';

export const IncomeSelect = ({income, setIncome }: { income: number ;setIncome: (value:  number) => void }) => {
    return (
        <div>
            <select value={income} onChange={(e) => {setIncome(Number(e.target.value))}}>
                <option value="0" selected>未選択</option>
                <option value="200">200万円以上</option>
                <option value="400">400万円以上</option>
                <option value="600">600万円以上</option>
                <option value="800">800万円以上</option>

            </select>
        </div>
    )
}