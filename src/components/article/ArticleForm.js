import React from 'react';
import TextInput from '../common/TextInput';

const ArticleForm = ({article, onSave, onDelete, onChange, saving, errors}) => {
  return (
    <form>
      <h1>Manage Article</h1>
      <TextInput
        name="universalProductCode"
        label="UPC"
        value={article.universalProductCode}
        onChange={onChange}
        error={errors.title}
      />

      <TextInput
        name="manufacturer"
        label="Manufacturer"
        value={article.manufacturer}
        onChange={onChange}
        error={errors.title}
      />

      <TextInput
        name="description"
        label="Description"
        value={article.description}
        onChange={onChange}
        error={errors.title}
      />

      <input
        type="submit"
        disabled={saving}
        value={saving ? 'Saving...' : 'Save'}
        className="btn btn-primary"
        onClick={onSave}/>

      <input
        type="submit"
        disabled={saving}
        value={saving ? 'Deleting...' : 'Delete'}
        className="btn btn-danger"
        onClick={onDelete}/>

    </form>
  );
};

ArticleForm.propTypes = {
  article: React.PropTypes.object.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default ArticleForm;
