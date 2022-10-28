import React from 'react';

export default function StatisticLine({text, value}) {

    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <td>{text}</td>
                        <td>
                            {value}
                            {text === 'positive' && ' %' }
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}