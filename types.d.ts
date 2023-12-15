type notionPageDetail = {
  object: 'page'
  id: string
  created_time: string
  last_edited_time: string
  created_by: {
    object: 'user'
    id: string
  }
  last_edited_by: {
    object: 'user'
    id: string
  }
  parent: {
    type: string
    database_id: string
  }
  archived: false
  properties: {
    completed: {
      id: string
      type: 'date'
      date?: {
        start: string
      }
    }
    resolved: {
      id: string
      type: 'checkbox'
      checkbox: boolean
    }
    riskLevel: {
      id: string
      type: 'select'
      select: {
        id: string
        name: 'Danger' | 'Very Slippery' | 'Quite Slippery' | 'Temperature High'
        color: string
      }
    }
    location: {
      id: string
      type: 'rich_text'
      rich_text: [
        {
          type: 'text'
          text: {
            content: string
            link?: string
          }
          plain_text: string
          href?: string
        }
      ]
    }
    when: {
      id: string
      type: 'rich_text'
      rich_text: [
        {
          type: 'text'
          text: {
            content: string
            link?: string
          }
          plain_text: string
          href?: string
        }
      ]
    }
    vehicle: {
      id: 'title'
      type: 'title'
      title: [
        {
          type: 'text'
          text: {
            content: string
            link?: string
          }
          plain_text: string
          href?: string
        }
      ]
    }
  }
  url: string
  public_url?: string
}

type notionPageHistory = {
  object: 'page'
  id: string
  created_time: string
  last_edited_time: string
  created_by: {
    object: 'user'
    id: string
  }
  last_edited_by: {
    object: 'user'
    id: string
  }
  parent: {
    type: string
    database_id: string
  }
  archived: false
  properties: {
    location: {
      id: string
      type: 'rich_text'
      rich_text: [
        {
          type: 'text'
          text: {
            content: string
            link?: string
          }
          plain_text: string
          href?: string
        }
      ]
    }
    location_end: {
      id: string
      type: 'rich_text'
      rich_text: [
        {
          type: 'text'
          text: {
            content: string
            link?: string
          }
          plain_text: string
          href?: string
        }
      ]
    }
    when: {
      id: string
      type: 'rich_text'
      rich_text: [
        {
          type: 'text'
          text: {
            content: string
            link?: string
          }
          plain_text: string
          href?: string
        }
      ]
    }
    when_end: {
      id: string
      type: 'rich_text'
      rich_text: [
        {
          type: 'text'
          text: {
            content: string
            link?: string
          }
          plain_text: string
          href?: string
        }
      ]
    }
    driver: {
      id: string
      type: 'rich_text'
      rich_text: [
        {
          type: 'text'
          text: {
            content: string
            link?: string
          }
          plain_text: string
          href?: string
        }
      ]
    }
    vehicle: {
      id: 'title'
      type: 'title'
      title: [
        {
          type: 'text'
          text: {
            content: string
            link?: string
          }
          plain_text: string
          href?: string
        }
      ]
    }
  }
  url: string
  public_url?: string
}
