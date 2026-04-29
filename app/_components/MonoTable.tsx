// Two-column mono table. Locked structure per SITE_SPEC.md section 1.10.2:
//   - JetBrains Mono, uppercase via CSS (source casing natural)
//   - text-secondary
//   - 0.5px hairline borders between rows
//   - Two header variants (orthogonal to the size variant below):
//     * No visible header: columns are symmetric (both columns are values).
//       Used by the resume's Programming languages, Web & markup, and
//       Tools & platforms tables, and by the contact page's response-time
//       table (where columns are EMAIL/2-3 DAYS, LINKEDIN/SLOWER, etc.,
//       both columns reading as values per SITE_SPEC § 1.10.2).
//     * Visible header: columns have asymmetric meaning. Header cells
//       render in the same JetBrains Mono uppercase as data cells, with
//       a heavier border-rule bottom under the header row to distinguish.
//       Used by the resume's Spoken languages table (Language / Level).
//
// Size variant (added step 14, /contact step):
//   - 'compact'  = 12px text + 0.1em tracking. Locked per spec § 6.6
//                  for the resume's four skills-wall tables. Default,
//                  maintaining backwards compatibility with all four
//                  resume call sites that omit the prop.
//   - 'standard' = 13px text + 0.05em tracking. Locked per spec § 4.4
//                  for the contact page's response-time table.
//
// The two variants exist because the spec independently locks each
// caller's font size and tracking; this is not a stylistic preference.
// The union is intentionally tight per the abstraction-threshold rule
// (no 'large' / 'borderless' / 'compact-no-tracking' until a third
// caller arrives with a real spec divergence). Same lookup-map pattern
// as ASPECT_CLASS in ProjectHeader.tsx so Tailwind's JIT emits each
// arbitrary value as a literal.
//
// Promoted to app/_components/ in step 14 once /contact became the
// second in-code caller (was previously co-located under
// app/resume/_components/).
//
// Accessibility: aria-label on the table (always); when headers is absent,
// a visually-hidden <thead> still carries placeholder column labels per
// docs/CLAUDE.md "Mono tables have a visually-hidden <thead> with column
// labels for screen readers."

export type MonoTableVariant = 'compact' | 'standard';

export type MonoTableProps = {
  rows: ReadonlyArray<readonly [string, string]>;
  headers?: readonly [string, string];
  ariaLabel: string;
  variant?: MonoTableVariant;
};

const VARIANT_CLASSES: Record<MonoTableVariant, string> = {
  compact: 'text-[12px] tracking-[0.1em]',
  standard: 'text-[13px] tracking-[0.05em]',
};

const CELL_BASE =
  'font-mono uppercase text-text-secondary py-3 align-top';

export function MonoTable({
  rows,
  headers,
  ariaLabel,
  variant = 'compact',
}: MonoTableProps) {
  const cell = `${CELL_BASE} ${VARIANT_CLASSES[variant]}`;
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
              className={`${cell} text-left text-text-primary font-normal w-1/2`}
            >
              {headers[0]}
            </th>
            <th
              scope="col"
              className={`${cell} text-left text-text-primary font-normal w-1/2`}
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
            <td className={`${cell} w-1/2 pr-4`}>{row[0]}</td>
            <td className={`${cell} w-1/2 pl-4`}>{row[1]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
