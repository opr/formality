import {normalize, schema} from 'normalizr';
import {fromJS, Map} from 'immutable';

export const normalizeState = config => {
  //loop through and set IDs in everything
  let index = 0;

  let newConfig = fromJS(config);
  newConfig = newConfig.update('pages', Map({}), page => page.map(page => page.set('id', index++)
    .update('sections', undefined, sections => sections.map(section => section.set('id', index++)
      .update('fields', undefined, fields => fields.map(field => field.set('id', index++)))
    )))).toJS();

  const field = new schema.Entity('fields', undefined);

  const section = new schema.Entity('sections', {fields: [field]}, {
    idAttribute: 'id'
  });
  const page = new schema.Entity('pages', {sections: [section]}, {
    idAttribute: 'id'
  });
  const form = new schema.Array(page);

  console.log(fromJS({options: config.options, data: normalize(newConfig.pages, form)}));
  return fromJS({options: config.options, data: normalize(newConfig.pages, form)});
};
