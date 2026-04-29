// Two-column mono table. Locked structure per SITE_SPEC.md section 1.10.2:
//   - JetBrains Mono 12px, uppercase via CSS (source casing natural)
//   - text-secondary
//   - 0.5px hairline borders between rows
//   - Two variants:
//     * No visible header: columns are symmetric (both columns are values).
//       Used by the resume's Programming languages, Web & markup, and
//       Tools & platforms tables.
//     * Visible header: columns have asymmetric meaning. Header cells
//       render in the same JetBrains Mono 12px uppercase as data cells,
//       with a heavier border-rule bottom under the header row to
//       distinguish. Used by the resume's Spoken languages table
//       (Language / Level).
//
// Co-located under app/resume/_components/ because /resume is the only
// in-code caller today. The contact page (step 14) is spec'd to use this
// pattern for its response-time-by-channel table; promote to
// app/_components/MonoTable.tsx in step 14 if and when /contact imports it.
//
// Accessibility: aria-label on the table (always); when headers is absent,
// a visually-hidden <thead> still carries placeholder column labels per
// docs/CLAUDE.md "Mono tables have a visually-hidden <thead> with column
// labels for screen readers."

export type MonoTableProps = {
  rows: ReadonlyArray<readonly [string, string]>;
  headers?: readonly [string, string];
  ariaLabel: string;
};

const CELL_BASE =
  'font-mono text-[12px] uppercase tracking-[0.1em] text-text-secondary py-3 align-top';

export function MonoTable({ rows, headers, ariaLabel }: MonoTableProps) {
  return (
    <table
      aria-label={ariaLabel}
      className="w-full border-collapse"
    >
      {headers ? (
        <thead>
          <tr className="border-b border-border-rule">
            <th
              scope="col"
              className={`${CELL_BASE} text-left text-text-primary font-normal w-1/2`}
            >
              {headers[0]}
            </th>
            <th
              scope="col"
              className={`${CELL_BASE} text-left text-text-primary font-normal w-1/2`}
            >
              {headers[1]}
            </th>
          </tr>
        </thead>
      ) : (
        <thead className="sr-only">
          <tr>
            <th scope="col">Item</th>
            <th scope="col">Item</th>
          </tr>
        </thead>
      )}
      <tbody>
        {rows.map((row, index) => (
          <tr
            key={`${row[0]}-${row[1]}-${index}`}
            className="border-b border-[0.5px] border-border-hairline last:border-b-0"
          >
            <td className={`${CELL_BASE} w-1/2 pr-4`}>{row[0]}</td>
            <td className={`${CELL_BASE} w-1/2 pl-4`}>{row[1]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
