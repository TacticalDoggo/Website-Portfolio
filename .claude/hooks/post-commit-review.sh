#!/bin/bash
# Claude Code Hook: Post-commit automation
# Fires after every git commit. Three levels:
# Level 1 (any commit): update tracker
# Level 2 (page/component changes): update tracker + check deviations
# Level 3 (new page built): update tracker + check deviations + full review
#
# The PostToolUse matcher fires on every Bash call, so we gate on the tool
# input here. Claude Code passes the event JSON on stdin. We only act when
# the tool_input.command is a `git commit`. No jq dependency.

PAYLOAD=$(cat)
echo "$PAYLOAD" | grep -qE '"command"[[:space:]]*:[[:space:]]*"git commit' || {
  echo '{}'
  exit 0
}

CHANGED_FILES=$(git diff --name-only HEAD~1 HEAD 2>/dev/null || echo "")
PAGE_CHANGES=$(echo "$CHANGED_FILES" | grep -E "(app/.*page\.tsx|components/.*\.tsx|app/globals\.css|CLAUDE\.md)" || true)
NEW_PAGES=$(echo "$CHANGED_FILES" | grep -E "app/.+/page\.tsx" || true)
ANY_CHANGES=$(echo "$CHANGED_FILES" | grep -v "^$" || true)

CONTEXT=""

if [ -n "$NEW_PAGES" ]; then
  CONTEXT="IMPORTANT POST-COMMIT TASKS (3 steps):\n\n"
  CONTEXT+="1. DEVIATIONS: Check if any changes deviate from SITE_SPEC.md. If they do, update deviations.md with: date, page, what the spec said, what changed, why. Changed files: ${PAGE_CHANGES//$'\n'/, }\n\n"
  CONTEXT+="2. TRACKER: Update tracker.md. Mark build steps DONE/IN PROGRESS, add new components, add new pages to Pages Live, update pending items.\n\n"
  CONTEXT+="3. REVIEW: A new page was just built (${NEW_PAGES//$'\n'/, }). Run the full review checklist before moving to the next page. Do NOT change any code during review. Report issues only.\n\n"
  CONTEXT+="   CONTENT REVIEW:\n"
  CONTEXT+="   - Verify all copy matches SITE_SPEC.md + deviations.md. Check the exact heading text, body paragraphs, and labels.\n"
  CONTEXT+="   - No em dashes (U+2014) anywhere.\n"
  CONTEXT+="   - No forbidden words: passionate, thrive, leverage, synergy, cutting-edge, innovative, world-class, rockstar, ninja, guru, excited, thrilled, journey.\n"
  CONTEXT+="   - Sentence case on all headings. No Title Case.\n"
  CONTEXT+="   - Verify heading hierarchy: single H1 per page, no skipped levels.\n"
  CONTEXT+="   - Check wink budget matches page genre (zero-wink pages: Resume, T&S, HackZurich, Nicular).\n"
  CONTEXT+="   - No fabricated technical claims not in the spec.\n\n"
  CONTEXT+="   SEO REVIEW:\n"
  CONTEXT+="   - Verify title tag, meta description, canonical URL, OG tags present (per SITE_SPEC.md Section 1.7).\n"
  CONTEXT+="   - Verify JSON-LD schema is present and matches the schema type for this page.\n"
  CONTEXT+="   - Verify all images have alt text.\n\n"
  CONTEXT+="   DESIGN REVIEW:\n"
  CONTEXT+="   - Fonts: Fraunces for headlines/pull quotes, Inter for body/UI, JetBrains Mono for labels/code.\n"
  CONTEXT+="   - Colors match token table (Section 1.2). No hardcoded hex values outside globals.css.\n"
  CONTEXT+="   - Images: real artifacts or typographic placeholders. No stock. 0.5px hairline border. No shadows. No rounded corners over 8px.\n"
  CONTEXT+="   - Captions use JetBrains Mono 11px, text-secondary, FIG. 0N format.\n\n"
  CONTEXT+="   CROSS-PAGE SYNC:\n"
  CONTEXT+="   - If this page uses project cards, verify they render from the shared projects.ts data source.\n"
  CONTEXT+="   - If this page references identity info (email, LinkedIn, GitHub, location), verify it matches SITE_SPEC.md Part 3 Identity References.\n\n"
  CONTEXT+="   CODE QUALITY REVIEW:\n"
  CONTEXT+="   - No unused imports or variables.\n"
  CONTEXT+="   - No console.log statements left in.\n"
  CONTEXT+="   - No TypeScript 'any' types. All props and data are properly typed.\n"
  CONTEXT+="   - No inline styles that belong in globals.css or Tailwind classes.\n"
  CONTEXT+="   - No repeated code blocks that should be a shared helper or component.\n"
  CONTEXT+="   - No missing key props on list renders.\n"
  CONTEXT+="   - Components are reasonably sized (flag anything over 200 lines that could be split).\n"
  CONTEXT+="   - prefers-reduced-motion is respected on any animations.\n\n"
  CONTEXT+="   RESPONSIVE REVIEW:\n"
  CONTEXT+="   - Check mobile behavior at <768px breakpoint matches spec.\n"
  CONTEXT+="   - Masthead: hamburger menu replaces nav links on mobile.\n\n"
  CONTEXT+="   BUILD AND PERFORMANCE:\n"
  CONTEXT+="   - Run npm run build. Must pass cleanly with zero warnings.\n"
  CONTEXT+="   - Run Lighthouse mobile. Record score in tracker.md. Targets: LCP < 1.5s, CLS 0, INP < 200ms.\n\n"
  CONTEXT+="   Report all issues found. Do not fix them. List them in tracker.md under Review Findings.\n"
  CONTEXT+="   Only proceed to the next page in the build order after review passes."

elif [ -n "$PAGE_CHANGES" ]; then
  CONTEXT="POST-COMMIT TASKS (2 steps):\n\n"
  CONTEXT+="1. DEVIATIONS: Check if any changes deviate from SITE_SPEC.md. If they do, update deviations.md. Changed files: ${PAGE_CHANGES//$'\n'/, }\n\n"
  CONTEXT+="2. TRACKER: Update tracker.md to reflect current build state."

elif [ -n "$ANY_CHANGES" ]; then
  CONTEXT="POST-COMMIT TASK: Update tracker.md if this commit changed anything relevant to build status."
fi

if [ -n "$CONTEXT" ]; then
  cat <<EOF
{
  "additionalContext": "$CONTEXT"
}
EOF
else
  echo '{}'
fi
exit 0
