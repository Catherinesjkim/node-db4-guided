
exports.up = function(knex) {
  return knex.schema
    .createTable('tracks', tbl => {
      tbl.increments(); // by default, it's id

      tbl
        .string('name', 255)
        .notNullable()
        .unique();
  })
  .createTable('students', tbl => {
    tbl.increments(); // by default, it's id

    tbl.string('name', 255).notNullable()
  })
  .createTable('cohorts', tbl => {
    tbl.increments(); // by default, it's id

    tbl
      .string('name', 255)
      .notNullable()
      .unique();

    // Foreign Key that references the id in tracks        
    tbl
      .integer('track_id')
      .unsigned() // no negative numbers
      .notNullable()
      .references('id')
      .inTable('tracks')
      .onDelete('RESTRICT') // If I delete it, don't let me delete it - will give me an error 
      .onUpdate('CASCADE'); // CASCADE - if I delete, delete all dependent records 
      // CASCADE, RESTRICT, DO NOTHING, SET NULL
  })
  .createTable('student_cohorts', tbl => {
    tbl.primary(['student_id', 'cohort_id']); // This is a compound id - PK + FK

    tbl
      .string('name', 255)
      .notNullable()
      .unique();

    tbl
      .integer('student_id')
      .unsigned() // no negative numbers
      .notNullable()
      .references('id')
      .inTable('students')
      .onDelete('RESTRICT') // If I delete it, don't let me delete it - will give me an error 
      .onUpdate('CASCADE'); // CASCADE - if I delete, delete all dependent records 

    tbl
      .integer('cohort_id')
      .unsigned() // no negative numbers
      .notNullable()
      .references('id')
      .inTable('cohorts')
      .onDelete('RESTRICT') // If I delete it, don't let me delete it - will give me an error 
      .onUpdate('CASCADE'); // CASCADE - if I delete, delete all dependent records 
  });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExits('student_cohorts')
    .dropTableIfExits('cohorts')
    .dropTableIfExits('students')
    .dropTableIfExits('tracks');
};
