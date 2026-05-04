# Entity Relationship (ER) Diagram

Below is the simplified ASCII representation of the two-table Entity Relationship diagram, focusing only on the main attributes.

```text
+-------------------+               +-------------------+
|       USER        |               |    PREDICTION     |
+-------------------+               +-------------------+
| PK: user_id       |               | PK: prediction_id |
|     email         | 1           N | FK: user_id       |
|     name          |---------------|     clinical_data |
|     created_at    |   generates   |     risk_score    |
+-------------------+               |     created_at    |
                                    +-------------------+
```

### Relationship:
- **One-to-Many (1:N)**: A single `USER` can generate multiple `PREDICTION` records over time, but each `PREDICTION` belongs strictly to one `USER`.
