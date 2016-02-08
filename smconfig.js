exports.config = {
  validate: true,
  name: 'ContentScheduling',

  states: {
    events: {
      after: {
        pattern: "role: 'content', context: 'document', cmd: 'save'"
      }
    },
    CREATE: {
      initState: true,
      defaults: {
        next: {
          error: 'CREATE'
        }
      },
      commands: {
        triage: {
          pattern: "role: 'content', context: 'document', cmd: 'triage'",
          next: {
            success: 'TRIAGE_CONTENT'
          }
        }
      }
    },
    TRIAGE_CONTENT: {
      commands: {
        review: {
          pattern: "role: 'content', context: 'document', cmd: 'review'",
          next: {
            success: 'REVIEW_CONTENT'
          }
        }
      }
    },
    REVIEW_CONTENT: {
      commands: {
        approve: {
          pattern: "role: 'content', context: 'document', cmd: 'approve'",
          next: {
            success: 'CONTENT_APPROVED',
            error: 'REVIEW_CONTENT'
          }
        }
      }
    },
    CONTENT_APPROVED: {
      commands: {
        schedule: {
          pattern: "role: 'content', context: 'document', cmd: 'schedule'",
          next: {
            success: 'CONTENT_SCHEDULED'
          }
        },
        review: {
          pattern: "role: 'content', context: 'document', cmd: 'review'",
          next: {
            success: 'REVIEW_CONTENT'
          }
        }
      }
    },
    CONTENT_SCHEDULED: {
      commands: {
        approve_final: {
          pattern: "role: 'content', context: 'document', cmd: 'approve_final'",
          next: {
            success: 'CONTENT_APPROVED_FINALIZED'
          }
        }
      }
    },
    CONTENT_APPROVED_FINALIZED: {
      commands: {
      }
    }
  }
}
