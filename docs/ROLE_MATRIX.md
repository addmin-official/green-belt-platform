# Green Belt Role Matrix

## Roles

| Role | Kurdish title | Main responsibility | Dashboard modules | Write access |
|---|---|---|---|---|
| `admin` | بەڕێوەبەری گشتیی سیستەم | Users, policy, approvals, audit, final reports | All modules | Full, subject to Firestore rules |
| `operator` | بەڕێوەبەری ئۆپەراسیۆن | Daily pilot coordination and operational reporting | Overview, restaurants, waste operations, compost, trees | Operational write access |
| `collection_officer` | بەرپرسی کۆکردنەوە | Source inspection, weight, photo, GPS and manifest | Overview, restaurants, waste operations | Collection and manifest records |
| `facility_operator` | بەرپرسی شوێنی پرۆسەکردن | Receipt, rejection, batch creation and process readings | Overview, waste operations, compost | Facility and batch records |
| `qa_manager` | بەڕێوەبەری دڵنیایی جۆرایەتی | Sampling, lab review, QA decision and locked release | Overview, compost, trees | QA-specific actions only |
| `laboratory` | نوێنەری تاقیگە | Sample verification and official laboratory result | Overview, compost | Laboratory result submission only |
| `viewer` | بینەر / ئەندامی لیژنە | Read-only committee review and reporting | Overview, trees, advisors | None |

## Firestore user document

Each authenticated user must have a document at:

```text
users/{uid}
```

Example:

```json
{
  "email": "person@example.com",
  "role": "collection_officer",
  "active": true,
  "assignedBy": "ADMIN_UID"
}
```

## Governance rules

- No user receives access without an active role document.
- Only an administrator may assign, change or deactivate a role.
- UI visibility is role-specific, but Firestore Security Rules remain the source of truth for enforcement.
- Viewers cannot modify operational records.
- Laboratory users cannot edit operational or QA decisions.
- QA releases are separate from laboratory results and must remain locked after release.
- Collection, process reading, laboratory, QA, incident and audit records are not deleted through normal workflows.
